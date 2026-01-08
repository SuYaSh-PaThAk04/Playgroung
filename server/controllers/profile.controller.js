import Profile from "../models/Profile.model.js";

export const upsertProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
};

export const searchBySkill = async (req, res) => {
  const { skill = "", page = 1, limit = 10 } = req.query;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);

  const query = {
    skills: { $regex: skill, $options: "i" },
  };

  const [profiles, total] = await Promise.all([
    Profile.find(query)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize),
    Profile.countDocuments(query),
  ]);

  res.json({
    data: profiles,
    meta: {
      page: pageNum,
      limit: pageSize,
      total,
      pages: Math.ceil(total / pageSize) || 1,
    },
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If ID is provided, update by ID, otherwise update the first profile
    const profile = id
      ? await Profile.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
      : await Profile.findOneAndUpdate({}, updateData, {
          new: true,
          runValidators: true,
        });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
