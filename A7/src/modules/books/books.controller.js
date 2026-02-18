import { Router } from "express";
const router = Router();
import { addBook, indexTitle ,addBooks,UpdateBook,findByTitle,findByYear,findBygenre, deleteByYear} from "./books.service.js";

router.get('/indexTitle', async (req, res) => {
  

    let userData = await indexTitle();
    res.json({message: "Done", data : userData});

});

router.post('/add-one-book', async (req, res) => 
    {
        let {title, author, year, geners} = req.body;
        let data = await addBook(title, author, year, geners);
        res.json({message: "Done", data : data});
    })
 
router.post('/add-many-books', async (req, res) => 
    {
        
        let data = await addBooks(req.body);
        res.json({message: "Done", data : data});
    })
router.patch('/update-book', async (req, res) => 
    {
        let {title, author, year, geners} = req.body;
        let data = await UpdateBook(title, author, year, geners);
        res.json({message: "Book Updated", data : data});
    })

router.get('/title/:title', async (req, res) => {
  

    let Data = await findByTitle(req.params.title);
    res.json({message: "found", data : Data});

});

router.get('/year', async (req, res) => {
  

    let Data = await findByYear();
    res.json({message: "found", data : Data});

});
router.get('/genre/:genre', async (req, res) => {
  

    let Data = await findBygenre(req.params.genre);
    res.json({message: "found", data : Data});

});

router.get( '/year/type', async (req, res) => {

    let Data = await findByYearInt(req.query.type);
    res.json({message: "found", data : Data});
});

router.get('/exclude-geners', async (req, res) => {
let Data = await findByGenreExclude(req.query.type);
res.json({message: "found", data : Data});    

})

router.delete('/before-year/:year', async (req, res) => {

    let data = await deleteByYear(req.params.year);
    res.json({message: "Deleted"});
})

router.get('/aggregate1', async (req, res) => {
    let data = await aggregate1();
    res.json({message: "Done", data : data});
})
router.get('/aggregate2', async (req, res) => {
    let data = await aggregate2();
    res.json({message: "Done", data : data});
})
export default router;