import { redirect } from '@sveltejs/kit';

export async function load() {
  throw redirect(307, '/qbc/613572e9-f471-4f0d-90d2-d8511d1ac462?type=QRScan');
}
