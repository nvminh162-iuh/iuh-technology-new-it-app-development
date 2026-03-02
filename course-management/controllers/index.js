const subjectsModel = require('../models');
const { uploadFile } = require('../service/file.service');

const subjectsController = {
    // Get all subjects
    getSubjects: async (req, res) => {
        try {
            const subjects = await subjectsModel.getSubjects();
            return res.status(200).json(subjects);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error getting subjects');
        }
    },
    // Get single subject by ID
    getSubject: async (req, res) => {
        try {
            const { id } = req.params;
            const subject = await subjectsModel.getSubject(id);
            if (subject) {
                return res.status(200).json(subject);
            }
            return res.status(404).send('Subject not found');
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
            const subject = await subjectsModel.createSubject({
                name,
                type,
                semester,
                faculty,
                image: imageUrl,
            });
            return res.status(200).json(subject);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error creating subject');
        }
    },
};

module.exports = subjectsController;
