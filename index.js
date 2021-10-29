const { ApolloServer, gql } = require('apollo-server');

const port = process.env.PORT || 8000;
//schema
//resolvers

const books = [
    {
        title: "James Walker",
        author: "James Dzah",
        ISBN: "0-7475-3269-9"
    },
    {
        title: "Micheal Scotch",
        author: "The whitemen",
        ISBN: "0-7475-3269-9"
    },
];
// type NameOftheType{
// fieldName: type
// }

const schemas = gql`
type Book {
    title: String!
    author: String!
    ISBN: String
}
type Query {
    books: [Book]
    book(title: String!): Book
}
type Mutation {
createBook(title: String!, author: String!, ISBN: String): Book
}
#type Subscription {}
    `;

const booksResolvers= {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.title == args.title)

    },
    Mutation: {
        createBook: (parent, args) => {
            const book = { title, author, ISBN } = args;
            books.push(book);
            return book;
        }
    },
}


const server = new ApolloServer({ typeDefs: schemas, resolvers: booksResolvers });

server.listen(port).then(({ url, port }) => {
    console.log(`server ready at ${url} and ready to be used`);
}).catch(err => console.log(err));

