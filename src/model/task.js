import mongoose,{Schema} from 'mongoose'

const TaskSchema = new Schema({
    title: {
        type: String,
        require:true
    },
    content: {
        type: String,
        require: true
    },
    addedDate: {
        type: Date,
        require: true,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["complete","pending"], // enum use because it value it present in this two
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        require: true
    },
})

export const Task = mongoose.models.tasks || mongoose.model('tasks',TaskSchema);

/*
Link to collection
Approach:1 
create one Database and combain
Ex:
    create user collection
    {
        name,
        address,
        ...,
        task: [
            {
                first task data
            },
            {
                second task data
            },
            ...
        ]
    }
    // problem waste bandwidth

Approach 2
Create two separate collection
using foreign key 

users{
    user_id
    task_id
}
tasks{
    task_id
    user_id
}
*/