// based on model in http://webapplog.com/test-driven-development-in-node-js-with-mocha/

var superagent = require('superagent');
var expect = require('expect.js');

describe('todo endpoint', function() {

  // we'll use this to track our newly created entry
  var id;

  // let's create a new entry
  var entry = {name: 'Another thing', done: false, note: 'well'};

  it('should post an entry', function(done){
    superagent.post('localhost/todo')
    .send(entry)
    .end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.equal(200);

      expect(res.body.name).to.eql(entry.name);
      expect(res.body.done).to.eql(entry.done);
      expect(res.body.note).to.eql(entry.note);

      id = res.body._id;
      done();
    });			// .end
  });

  it('should retrieve the entry', function(done){
    superagent.get('localhost/todo/' + id)
    .end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.equal(200);

      expect(res.body.name).to.eql(entry.name);
      expect(res.body.done).to.eql(entry.done);
      expect(res.body.note).to.eql(entry.note);

      done();
    });			// .end
  });

  // expect an array containing the item in response to GET all
  it('should receive a response', function(done){
    superagent.get('localhost/todo').end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.be(200);

      expect(res.body instanceof Array).to.be.true;

      expect(res.body.some(function(item) {
        return (item._id == id);
      })).to.eql(true);
      done();
    })
  });

  entry.name = 'updated thing';
  it('should update an entry', function(done){
    superagent.put('localhost/todo/' + id)
    .send(entry)
    .end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.be(200);

      expect(res.body.name).to.eql(entry.name);
      expect(res.body.done).to.eql(entry.done);
      expect(res.body.note).to.eql(entry.note);

      done();
    });			// .end
  });

  it('should delete the entry', function(done){
    superagent.del('localhost/todo/' + id)
    .end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.be(200);

      expect(res.body._id).to.be(id);

      done();
    });			// .end
  });

  it('should not retrieve the deleted entry', function(done){
    superagent.get('localhost/todo/' + id)
    .end(function(error, res){
      expect(error).to.be(null);
      expect(res.status).to.be(200);

      expect('_id' in res.body).to.be.false;

      done();
    });			// .end
  });

});
