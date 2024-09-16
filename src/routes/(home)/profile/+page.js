import { redirect } from '@sveltejs/kit';

export async function load() {
  throw redirect(307, '/qbc/b9069595-2a92-487a-8756-2ab437c29758?type=QRScan');
}

// e5b936c8-77fd-4cd9-a5b5-0ff7c1ea31eb
