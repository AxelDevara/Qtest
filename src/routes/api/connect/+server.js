import supabase from "@lib/db.js";
import admin from "firebase-admin";
import * as fcm from "firebase-admin/messaging";

import serviceAccount from "@lib/ServiceAccountKey.json";

const generateEmailFunc = import.meta.env.VITE_CONNECT_WITH_ME_URL;

export const POST = async (ctx) => {
    if (admin.apps?.length === 0)
        admin.initializeApp({
            // @ts-ignore
            credential: admin.credential.cert(serviceAccount)
        });

    const body = await ctx.request.json();
    const res = await insertSupabase(body);

    if (res != true)
        return new Response(JSON.stringify({ res }), { status: 401 });

    if (body.connector.mode != "noacc") {
        //send notification to connector
        await generateNotification(body.cardowner.data.uid, body.cardowner.data.profileData.firstname);
    }
    //Send notification to profile owner
    await generateNotification(body.connector.data.uid, body.connector.data.profileData.firstname);
    const response = await fetch(generateEmailFunc, { method: "POST", body: JSON.stringify(body) });
    return new Response(JSON.stringify({ connected: true }));


};

const generateNotification = async (uid, name) => {
    if (uid) {
        const { data } = await supabase.from("notification_token").select('token').eq('uid', uid);
        if (data.length > 0) {
            const tokensArr = data.map((obj) => {
                return obj.token;
            });
            const message = {
                notification: {
                    title: name + ' has connected with you',
                    body: 'Open app to see your new contact list'
                },
                tokens: tokensArr
            };
            fcm.getMessaging().sendEachForMulticast(message)
                .then((response) => {
                    // Response is a message ID string.
                })
                .catch((error) => {
                });
        }
    }
}


const insertSupabase = async (e) => {
    let event = e;
    if (event.pos != null) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.pos.latitude},${event.pos.longitude}&result_type=street_address&key=${import.meta.env.VITE_GMAP_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
            event.connector.data.geodata = data.results[0];
        }
    }

    if (event.cardowner.mode == "basic" && event.connector.mode == "team") {
        const { error: err } = await supabase
            .from('team_connection_acc')
            .insert([event.cardowner.data]);

        const { error: err2 } = await supabase
            .from('connection_acc')
            .insert([event.connector.data]);

        if (err || err2)
            return err || err2;

        return true;
    }

    //sementara nggak kepake
    if (event.cardowner.mode == "team" && event.connector.mode == "basic") {
        const { error } = await supabase
            .from('team_connection_acc')
            .insert([event.connector.data]);

        const { error: error2 } = await supabase
            .from('connection_acc')
            .insert([event.cardowner.data]);

        if (error || error2)
            return error || error2;

        return true;
    }

    if (event.cardowner.mode == "basic" && event.connector.mode == "noacc") {
        const { error } = await supabase
            .from('connection_acc')
            .insert([event.connector.data]);

        if (error)
            return error;

        return true;
    }

    if (event.cardowner.mode == "team" && event.connector.mode == "noacc") {
        const { error } = await supabase
            .from('team_connection_acc')
            .insert([event.connector.data]);

        if (error)
            return error;

        return true;
    }

    if (event.cardowner.mode == "basic" && event.connector.mode == "basic") {
        const { error } = await supabase
            .from('connection_acc')
            .insert([event.cardowner.data, event.connector.data]);

        if (error)
            return error;

        return true;
    }
}