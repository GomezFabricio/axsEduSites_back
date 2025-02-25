import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  id: { type: String },
  content: { type: String },
  items: { type: Array }
});

const pageContentSchema = new mongoose.Schema({
  content: [contentSchema]
});

const PageContent = mongoose.model('PageContent', pageContentSchema);

export default PageContent;