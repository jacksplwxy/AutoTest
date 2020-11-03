const undoList = {
  successs: true,
  data: [{
    		status: 'div',
    		value: 'hello world'
    	},
    	{
    		status: 'div',
    		value: 'Hwo are U'
    	}
  ]
}
export default {
  get (url) {
    if (url === '/getUndoList.json') {
      return new Promise((resolve,reject) => {
        if(this.successs){
          resolve(undoList)
        }else{
          reject(new Error())
        }
        
      })
    }
  }
}
