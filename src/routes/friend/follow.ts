export default async (req, res, next) => {
    const id = parseInt(req.params.id);
    const friend_user_id = parseInt(req.params.friend_user_id);

    res.json({ success: true });
};
