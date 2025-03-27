import Lead from '../models/leadModel.js';

export const assignLead = async (leadId, userId) => {
    return await Lead.findByIdAndUpdate(leadId, { assignedTo: userId }, { new: true });
};
