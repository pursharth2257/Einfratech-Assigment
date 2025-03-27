import Lead from '../models/leadModel.js';

export const createLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error creating lead', error: error.message });
    }
};

export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find(); // Fetch all leads without filtering
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error: error.message });
    }
};


export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead', error: error.message });
    }
};

export const updateLead = async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });

        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lead', error: error.message });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);
        if (!deletedLead) return res.status(404).json({ message: 'Lead not found' });

        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lead', error: error.message });
    }
};

export const searchLeads = async (req, res) => {
    try {
        const { search, sortBy, order } = req.query;
        let query = {};

        if (search) {
            query.name = search; // Exact match search for 'name'
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        const leads = await Lead.find(query).sort(sortOptions);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error searching leads', error: error.message });
    }
};