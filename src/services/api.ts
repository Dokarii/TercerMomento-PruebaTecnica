const API_BASE = "http://localhost:3000";

export const api = {
  // Auth endpoints
  async getUsers() {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  },

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
  }) {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Subscriptions endpoints
  async getSubscriptions(userId: number) {
    const response = await fetch(`${API_BASE}/subscriptions?userId=${userId}`);
    return response.json();
  },

  async createSubscription(subscriptionData: any) {
    const response = await fetch(`${API_BASE}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });
    return response.json();
  },

  async updateSubscription(id: number, subscriptionData: any) {
    const response = await fetch(`${API_BASE}/subscriptions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });
    return response.json();
  },

  async deleteSubscription(id: number) {
    const response = await fetch(`${API_BASE}/subscriptions/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },
};
