export const PuppeteerClient = {
  async fetchData() {
    const res = await fetch('/api/puppeteer');
    if (!res.ok) throw new Error('Failed to fetch puppeteer data');
    return await res.json();
  }
};
