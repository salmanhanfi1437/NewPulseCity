// src/utils/SecureStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

class SecureStorage {
  private static instance: SecureStorage;

  private constructor() {} // ✅ Private constructor ensures singleton

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await EncryptedStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`[SecureStorage] Failed to set item for key: ${key}`, error);
    }
  }

  async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`[SecureStorage] Failed to get item for key: ${key}`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error(`[SecureStorage] Failed to remove item for key: ${key}`, error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.error('[SecureStorage] Failed to clear storage', error);
    }
  }
}

export default SecureStorage.getInstance();
