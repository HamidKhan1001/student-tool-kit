router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            isAuthenticated: true, 
            user: req.session.user 
        });
    } else {
        res.json({ isAuthenticated: false });
    }
});