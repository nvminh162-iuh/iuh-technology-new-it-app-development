const subjectsModel = require('../models');
const { uploadFile } = require('../service/file.service');

const subjectsController = {
    // Get all subjects
    getSubjects: async (req, res) => {
        try {
            const subjects = await subjectsModel.getAll();
            return res.render('index', { subjects });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error getting subjects');
        }
    },
    // Get single subject by ID
    getSubject: async (req, res) => {
        try {
            const { id } = req.params;
            const subject = await subjectsModel.getById(id);
            if (subject) {
                return res.render('edit', { subject });
            }
            res.redirect('/subjects');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error getting subject');
        }
    },
    createSubject: async (req, res) => {
        const { name, type, semester, faculty } = req.body;
        const image = req.file;
        try {
            const imageUrl = await uploadFile(image);
            await subjectsModel.create({
                name,
                type,
                semester,
                faculty,
                image: imageUrl,
            });
            res.redirect('/subjects');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error creating subject');
        }
    },

    updateSubject: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, type, semester, faculty } = req.body;
            const image = req.file;

            // Nếu có file mới thì upload, không thì giữ image cũ từ req.body
            const imageUrl = image ? await uploadFile(image) : req.body.image;

            await subjectsModel.update(id, {
                name,
                type,
                semester,
                faculty,
                image: imageUrl,
            });

            res.redirect('/subjects');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error updating subject');
        }
    },

    deleteSubject: async (req, res) => {
        try {
            const { id } = req.params;
            const existed = await subjectsModel.getById(id);
            if (!existed) {
                return res.redirect('/subjects');
            }
            await subjectsModel.delete(id, existed.name);
            res.redirect("/subjects");
        } catch (error) {
            console.log(error);
            res.status(500).send('Error deleting subject');
        }
    },
};

module.exports = subjectsController;
