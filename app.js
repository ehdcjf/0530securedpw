const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const { sequelize, User } = require('./models');
const auth = require('./middleware/auth');
const securedPassword = require('./jwt');



app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false, }));

sequelize.sync({ force: false, })
  .then(() => { console.log('접속 완료') })
  .catch(() => { console.log('접속 실패 ') })



app.get('/', (req, res) => {
  res.render('index.html');
})

app.get('/user/login', (req, res) => {
  res.render('login.html')
})

app.post('/user/login', async (req, res) => {
  let userid = req.body.userid;
  let userpw = req.body.userpw;
  userpw = await securedPassword(userpw);

  let result = await User.findOne({
    attributes: ['userpw'],
    where: {
      userid,
    }
  })

  let userpwInDB = result.dataValues.userpw;
  if (userpw == userpwInDB) {
    res.render('index.html', {
      userid,
    })
  } else {
    res.redirect('/?msg=로그인 실패');

  }

})

app.get('/user/join', (req, res) => {
  res.render('join.html')
})

app.post('/user/join', async (req, res) => {
  console.log(req.body);
  let userid = req.body.userid;
  let userpw = req.body.userpw;
  userpw = await securedPassword(userpw);

  let result = await User.create({
    userid,
    userpw,
  });

  console.log(result.dataValues.userid);
  userid = result.dataValues.userid;

  res.render('join_success.html', {
    userid,
  })

})

app.listen(3000, () => {
  console.log('hello port 3000');
})