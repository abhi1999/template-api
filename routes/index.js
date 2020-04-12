const express = require('express')
const {EMPLOYEES_COLLECTION, JOB_SITES_COLLECTION,SERVICE_RESPONSE, EMPLOYEE_JOBSITE_COLLECTION} = require("./../config");
const { contacts, genericController, bingoController } = require('../controllers')
const router = express.Router()


router.get("/contacts", contacts.getAll);
router.post('/contact', contacts.createOne);
router.get("/contact/:id", contacts.getOne);
router.put("/contact/:id", contacts.updateOne);
router.delete("/contact/:id", contacts.deleteOne);

const employee = new genericController(EMPLOYEES_COLLECTION)

router.get("/employees", employee.getAll);
router.post('/employee', employee.create);
router.get("/employee/:id", employee.getById);
router.put("/employee/:id", employee.updateById);
router.delete("/employee/:id", employee.deleteById);


const jobSites = new genericController(JOB_SITES_COLLECTION)

router.get("/jobSites", jobSites.getAll);
router.post('/jobSite', jobSites.create);
router.get("/jobSite/:id", jobSites.getById);
router.put("/jobSite/:id", jobSites.updateById);
router.delete("/jobSite/:id", jobSites.deleteById);


const empJobSites = new genericController(EMPLOYEE_JOBSITE_COLLECTION)

router.get("/empjobSites", empJobSites.getAll);
router.post('/empjobSite', empJobSites.create);
router.get("/empjobSite/:id", empJobSites.getById);
router.put("/empjobSite/:id", empJobSites.updateById);
router.delete("/empjobSite/:id", empJobSites.deleteById);


const dmsService = new genericController(SERVICE_RESPONSE)
router.get("/dmsServices", dmsService.getAll);
router.post('/dmsService', dmsService.create);
router.get("/dmsService/:id", dmsService.getById);
router.put("/dmsService/:id", dmsService.updateById);
router.delete("/dmsService/:id", dmsService.deleteById);

router.get("/getGameList", bingoController.getGameList);
router.get('/getGameParticipants/:gameId', bingoController.getGameParticipants);
router.post("/verifyPassword/:gameId/:participantId", bingoController.verifyPassword);
router.get("/getGameDetails/:gameId/:participantId", bingoController.getGameDetails);
// router.get("/claimBingo/:gameId/:participantId", dmsService.deleteById);
router.get("/callNumber/:gameId/:number", bingoController.callNumber);
router.get("/cancelNumberCall/:gameId/:number", bingoController.cancelNumberCall);

/*

const testMe=(req, res, next)=>{
    try {
        var Scraper = require("./scraper");
         var scraper = new Scraper("http://i1259.photobucket.com/albums/ii541/slingshottshirts/ACE%20ATTORNEY/AA501.jpg");
        // var scraper = new Scraper("https://apod.nasa.gov/apod/astropix.html");
        const  images =[];
        scraper.on("image", function(image){
            console.log('image found', image.name)
            images.push(image.name)
            // Do something.	
        });
        scraper.scrape();
      res.status(200).json({images});
      next()
    } catch(e) {
      console.log(e.message)
      // handleError(res, e.message, "Failed to get contacts.");
      next(e)
    }
  }

router.get('/testMe',testMe)
*/
module.exports = router