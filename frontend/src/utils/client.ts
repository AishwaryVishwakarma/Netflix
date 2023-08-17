// Sanity client to connect with the database server

import {createClient} from '@sanity/client';

const todayDate = new Date().toISOString().slice(0, 10);

export const projectId = 's4d4rark';

export const dataset = 'production';

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true,
  apiVersion: todayDate.toString(),
});
