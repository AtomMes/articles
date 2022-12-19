//! JWT

app.post("/auth/login", (req, res) => {
  const token = jwt.sign(
    {
      //jwt ov zashifrovat enq anum(aysinqn saranq darnum en (a;lsdkjf;q) senc mi ban)//25
      email: req.body.email,
      fullName: req.body.fullName,
    },
    "secret"
  ); //asum enq vor secret baroc zashifrovat ani

  res.json({
    success: true,
    token,
  });
});

