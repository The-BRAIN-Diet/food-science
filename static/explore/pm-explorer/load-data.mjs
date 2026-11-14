export async function loadViewerData(file, key) {
  const response = await fetch(file, {cache: 'no-store'});
  if (!response.ok) throw new Error(`Could not load ${file}: ${response.status}`);
  const data = await response.json();
  if (data.records_file) {
    const records = await fetch(new URL(data.records_file, response.url), {cache: 'force-cache'});
    if (!records.ok) throw new Error(`Could not load viewer records: ${records.status}`);
    data[key] = await records.json();
  }
  return data;
}
