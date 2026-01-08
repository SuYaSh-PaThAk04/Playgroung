const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/api/profile`);
  return res.json();
};

export const searchBySkill = async (skill, page = 1, limit = 6) => {
  const params = new URLSearchParams({
    skill,
    page: String(page),
    limit: String(limit),
  });
  const res = await fetch(`${BASE_URL}/api/search?${params.toString()}`);
  return res.json();
};

export const login = async (password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    throw new Error("Invalid admin password");
  }

  return res.json();
};

export const createProfile = async (profileData, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/api/profile`, {
    method: "POST",
    headers,
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to create profile" }));
    throw new Error(error.error || "Failed to create profile");
  }

  return res.json();
};

export const updateProfile = async (id, profileData, token) => {
  const url = id ? `${BASE_URL}/api/profile/${id}` : `${BASE_URL}/api/profile`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
};
