'use server';

/**
 * @fileOverview Server-side actions for fetching CTF intelligence.
 * Bypasses CORS by executing on the server.
 */

export async function fetchCTFEvents(start: number, finish: number) {
  try {
    const targetUrl = `https://ctftime.org/api/v1/events/?limit=100&start=${start}&finish=${finish}`;
    const response = await fetch(targetUrl, {
      next: { revalidate: 600 }, // Cache for 10 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`CTFtime API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Server Action CTF Fetch Error:', error);
    return null;
  }
}

export async function fetchCTFScoreboard(year: string) {
  try {
    const targetUrl = `https://ctftime.org/api/v1/results/${year}/`;
    const response = await fetch(targetUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`CTFtime API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Server Action Scoreboard Fetch Error:', error);
    return null;
  }
}
