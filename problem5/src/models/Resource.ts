import mongoose, {Schema, Document} from "mongoose";

export interface IResource extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    context?: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        context: { type: String, required: false },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

const Resource = mongoose.model<IResource>("Resource", ResourceSchema);
export default Resource;