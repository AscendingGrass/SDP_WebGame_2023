const login = async (req, res)=>{
    const { username, password } = req.body;
    const result = await User.findOne({username});
    console.log(result);
    if(!result){
        return res.status(200).json({
            error: true,
            msg: "User tidak terdaftar!"
        });
    }
    
    if(result.password != password){
        return res.status(200).json({
            error: true,
            msg: "Password salah!"
        });
    }

    req.pengguna = result;
    return res.status(200).json({
        error: false,
        msg: "Berhasil login!",
        result
    });
}

module.export = {
    login
}