import { getData, setData } from "../helpers/fileData.js";
import  sendEmailMessage  from "../helpers/mailer.js";

class Userscontroller {

    async getAll(req, res){
        try{
            const items = await getData('users.json');

        if(!items.length){
            return res.status(404).json({
            success: false,
            message: "ma'lumotlar topilmadi"
        })
    }
        return res.status(200).json({
        success:true,
        data:items
})
}catch(err){
        console.log(`getAll da error: ${err.message}`)
        return res.status(500).json({
        success:false,
        message:"Serverda xatolik bor"
        })
    }
}
    async getId(req, res){
        try{
            const items=await getData('users.json')
            const id=+req.params.id;
            const item=items.find(el=>el.id===id)

        if(!item){
        return res.status(404).json({
        success:false,
         message:"foydalanuvchi topilmadi"
    })
}
        return res.status(200).json({
        success:true,
        message:"topildi",
        data: item
            })
}catch(err){
        console.log(`getId da error: ${err.message}`)
        return res.status(500).json({
        success: false,
        message: "Serverda xatolik bor"
        })
    }
}
    async create(req, res){
        try{
        const items=await getData('users.json');
        const {name, email} = req.body;
        const newItem={
        ...req.body,
        id: items.length ? items.at(-1).id + 1 : 1
}       
        await sendEmailMessage(email, name)

        items.push(newItem)
        await setData('users.json', items)
        
        return res.status(201).json({
        success: true,
        message: "foydalanuvchi muvaffaqiyatli qo'shildi",
        data: newItem
})
}catch(err){
    console.log(`create da error: ${err.message}`)
    return res.status(500).json({
    success: false,
    message: "Serverda xatolik bor"
        })
    }
}
async update(req, res) {
        try {
            const id = +req.params.id;
            const items = await getData('users.json')
            const index = items.findIndex(el => el.id === id)

            if (index===-1){
                return res.status(404).json({
                    success: false,
                    message: "foydalanuvchi topilmadi"
        })
    }
        items[index] = {
        ...items[index],
        ...req.body,
        id: id
}
        await setData('users.json', items);
        return res.status(200).json({
            success: true,
            message: "foydalanuvchi o'zgartirildi",
            data: items[index]
    })
}catch(err){
            console.log(`update da error: ${err.message}`)
            return res.status(500).json({
                success: false,
                message: "Serverda xatolik bor"
            });
        }
    }
    async deleteItem(req, res) {
        try {
        const id = +req.params.id;
        const items = await getData('users.json')
        const index = items.findIndex(el => el.id === id)
        if(index===-1){
        return res.status(404).json({
        success: false,
        message: "foydalanuvchi topilmadi"
    })
}
        items.splice(index, 1);
        await setData('users.json', items);
        return res.status(200).json({
        success: true,
        message: "foydalanuvchi o'chirildi"
            })
}catch(err){
        console.log(`delete da error: ${err.message}`)
        return res.status(500).json({
        success: false,
         message: "Serverda xatolik bor"
        })
        }
    }
  
}

export default new Userscontroller();