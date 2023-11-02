const {buildSchema}=require('graphql')

module.exports=buildSchema(`
type Post{
   
    title:String!
    desc:String!
   name:String!

}
type User{
    _id:ID!
    name:String!
    email:String!
    password:String!
    status:String!
    post:[Post!]!

}
input UserInputData{
    email:String!
    name:String!
    password:String!
}


type AuthData{
    
    userId:String!
}

input postInputData{
    
    name:String!
    title:String!
    desc:String!
}

type RootQuery{
    login(email:String!,password:String!):AuthData!
}

type RootMutation {
    createUser(userInput: UserInputData) :User!
    createPost(postInput: postInputData) :Post!

}

schema {
    query:RootQuery
    mutation:RootMutation
}
`);