/*
 * Model has 
 * 1.data 
 * 2. query that corrsponds to that data
 */
function createAction(onCallBack){
  const action = function(data){
    onCallBack(data,action.onAction);
  }
  return action;
}
export default class {
  constructor(){
    this.filters= [];
    this.builds= [];
    this.query={}
    const self = this;
    this.actions =  {
      QueryChange : createAction((data,onAction) =>{
        Object.assign(self.query,data);
        onAction(self);
      }),
      DataChange : createAction((data,callBack)=>{
        Object.assign(self,data);
        callBack(self);
      }),
      RemoveFilter : createAction((removedFilter,callBack)=>{
        //-------- Optimistic Update
        const idx = self.filters.indexOf(removedFilter);
        self.filters.splice(idx, 1);
        self.actions.DataChange(self);
        //---------------
        callBack(self);
      })
    }
  }
}
