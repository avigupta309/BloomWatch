/* eslint-disable no-useless-catch */
// services/flowerService.ts
class FlowerService {
  private requestQueue: (() => Promise<void>)[] = [];
  private isProcessing = false;
  private cache = new Map<string, string | null>();
  private pendingRequests = new Map<string, Promise<string | null>>();

  async getFlowerImage(flowerName: string): Promise<string | null> {
    // Check cache first
    if (this.cache.has(flowerName)) {
      return this.cache.get(flowerName) || null;
    }

    // If request is already pending, return the same promise
    if (this.pendingRequests.has(flowerName)) {
      return this.pendingRequests.get(flowerName)!;
    }

    // Create new request promise
    const promise = new Promise<string | null>((resolve) => {
      this.requestQueue.push(async () => {
        try {
          const imageUrl = await this.fetchFlowerImage(flowerName);
          this.cache.set(flowerName, imageUrl);
          resolve(imageUrl);
        } catch (error) {
          console.error(`Failed to fetch ${flowerName}:`, error);
          resolve(null);
        } finally {
          this.pendingRequests.delete(flowerName);
        }
      });
    });

    this.pendingRequests.set(flowerName, promise);
    
    if (!this.isProcessing) {
      this.processQueue();
    }

    return promise;
  }

  private async processQueue() {
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const task = this.requestQueue.shift();
      if (task) {
        await task();
        // Wait 2 seconds between requests to respect rate limits
        await this.delay(2000);
      }
    }
    
    this.isProcessing = false;
  }

  private async fetchFlowerImage(flowerName: string): Promise<string | null> {
    try {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=sk-rfbZ68e21994cd23012692&q=${encodeURIComponent(flowerName)}`
      );

      if (response.status === 429) {
        throw new Error('Rate limited');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return data.data[0]?.default_image?.original_url || null;
      }
      
      return null;
    } catch (error) {
      throw error;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const flowerService = new FlowerService();