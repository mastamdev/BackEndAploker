const Category = require('../models/Category')
const Job = require('../models/Job')
const Image = require('../models/Image')
const Users = require('../models/Users')
const Lamar = require('../models/Lamar')
const fs = require('fs-extra');
const path = require('path');



module.exports = {
    viewDashboard : (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
          title : "Cari Kerja | Dashboard"
        })
    },

    viewCategory : async (req, res) => {
        try {
            const category = await Category.find()
                const alertMessage = req.flash('alertMessage')
                const alertStatus = req.flash('alertStatus')
                const alert = { message : alertMessage, status : alertStatus }
            res.render('admin/category/view_category', {
                title : "Cari Kerja | Category",
                alert,
                category
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
        
    },

    addCategory : async (req,res) => {
        try {
            const { name } = req.body;
            // console.log(req.file)
            await Category.create({
              name,
              imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
          }
    },

    editCategory : async (req, res) => {
        try {
            const { id, name } = req.body;
            // console.log(name)
            const category = await Category.findOne({ _id: id });
            if (req.file == undefined) {
              category.name = name;
              await category.save();
              req.flash('alertMessage', 'Success Update category');
              req.flash('alertStatus', 'success');
              res.redirect('/admin/category');
            } else {
              await fs.unlink(path.join(`public/${category.imageUrl}`));
              category.name = name;
              category.imageUrl = `images/${req.file.filename}`
              await category.save();
              req.flash('alertMessage', 'Success Update Category');
              req.flash('alertStatus', 'success');
              res.redirect('/admin/category');
            }
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
          }
    
    },

    deleteCategory : async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            await fs.unlink(path.join(`public/${category.imageUrl}`));
            await category.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
          }
    },

    viewJob : async (req, res) => {
      try {
        const category = await Category.find()
        const image = await Image.find()
        const job = await Job.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message : alertMessage, status : alertStatus }
        res.render('admin/job/view_job',{
          title : "Cari Kerja | Job",
          category,
          alert,
          job
        })
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/job');
      }
    },

    addJob : async (req, res) =>{
      try {
        const {categoryId, title, company, place, detail, kualifikasi, tanggungJawab} =req.body
        console.log(title)
        if(req.files.length > 0){
            const category = await Category.findOne({_id : categoryId})
            const newJob = {
                categoryId,
                title,
                company,
                place,
                detail,
                kualifikasi,
                tanggungJawab
            }
            const job = await Job.create(newJob)
            category.jobId.push({_id:job._id})
            await category.save()
            for(let i = 0; i < req.files.length; i++) {
                const imageSave = await Image.create({imageUrl : `images/${req.files[i].filename}`})
                job.imageId.push({ _id:imageSave._id })
                await job.save()
            }
            req.flash('alertMessage', 'Success add Item');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/job')
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/job');
    }
    },

    viewUsers : async (req, res) => {
      try {
        const users = await Users.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message : alertMessage, status : alertStatus }
        res.render('admin/users/view_users',{
          title : "Cari Kerja | Users",
          alert,
          users
        })
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/users');
      }
    },

    addUsers : async (req, res) => {
        try {
          const { name, email, password, noHp, jenisKelamin } =req.body
          console.log(name);
          
          await Users.create([{ 
            name, 
            email, 
            password, 
            noHp, 
            jenisKelamin }]);
          req.flash('alertMessage', 'Success Add Users');
          req.flash('alertStatus', 'success');
          res.redirect('/admin/users');
        } catch (error) {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/admin/users');
        }
    },

    editUsers : async (req, res) => {
      try {
        const { id, name, email, password, noHp, jenisKelamin } =req.body
        console.log(id)
        const users = await Users.findOne({ _id : id })
        console.log(users)
        users.name = name
        users.email =email
        users.password= password
        users.noHp = noHp
        users.jenisKelamin = jenisKelamin
        console.log(name)
        await users.save()
        req.flash('alertMessage', 'Success Add Users');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/users');
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/users');
      }
    },

    viewLamar : async (req,res) => {
      try {
        const lamar = await Lamar.find()
        const users = await Users.find()
        const job = await Job.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message : alertMessage, status : alertStatus }
          res.render('admin/lamar/view_lamar', {
            title : "Cari Kerja | Lamar",
            lamar,
            users,
            job,
            alert
          })
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/lamar');
      }
    },

    addlamar : async (req, res) => {
      try {
        const {usersId, namaLengkap, email, noHp, jobId } = req.body
        const users = await Users.findOne({_id : usersId})
        const job = await Job.findOne ({_id : jobId})
        console.log(usersId)
        const newLamar = {
          usersId,
          namaLengkap,
          email,
          noHp,
          jobId
        }
        console.log(newLamar)
        const lamar = await Lamar.create(newLamar)
        users.usersId.push({_id:lamar._id})
        await users.save()
        job.jobId.push({_id:lamar._id})
        await job.save()
        await lamar.save()

        req.flash('alertMessage', 'Success Add Users');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/lamar');
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/lamar');
      }

    }
}