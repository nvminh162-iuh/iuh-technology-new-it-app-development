const subjectsModel = require('../models');

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

    // Create subject
    createSubject: async (req, res) => {
        try {
            const newSubject = await subjectsModel.createSubject(req.body);
            return res.status(201).json(newSubject);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error creating subject');
        }
    },

    // Update subject
    updateSubject: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedSubject = await subjectsModel.updateSubject(id, req.body.name, req.body);
            return res.status(200).json(updatedSubject);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error updating subject');
        }
    },

    // Delete subject
    deleteSubject: async (req, res) => {
        try {
            const { id } = req.params;
            await subjectsModel.deleteSubject(id, req.body.name);
            return res.status(200).send('Subject deleted successfully');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error deleting subject');
        }
    }
};

module.exports = subjectsController;
