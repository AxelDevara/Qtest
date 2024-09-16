import supabase from '@lib/db';

export async function load({ params }) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('external_id', params.slug);

  return {
    invoice: data[0] ?? null,
    invoiceId: params.slug,
  };
}
