import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export abstract class BaseService<T> {

  public pathUrl: string;

  /**
   *
   * @param pathUrl This service is the main entry point for this feature module.
   */
  constructor(
    private http: HttpClient,
    private pathurl: string,
  ) {
    this.pathUrl = pathurl;
  }

  // public All(): Observable<Array<T>> {
  //   return this.http.get<Array<T>>(endpoint + 'subproduct/all', this.httpOptions).pipe(
  //     // map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

  // public Create(data: T) {
  //   delete data["Key"];
  //   return this._db.collection<T>(this._dbPath).add(data);
  // }

  // public Read = (identifier: string): Promise<T> => {
  //   let result = new Promise<T>((_resolve, _reject) => {
  //     this._db.collection<T>(this._dbPath).doc<T>(identifier).get()
  //       .toPromise()
  //       .then(
  //         (querySnapshot) => {
  //           let dataResult: T
  //           if (querySnapshot.exists) {
  //             // console.debug(querySnapshot)
  //             let data = querySnapshot.data()
  //             dataResult = data as T
  //             // console.debug(dataResult)
  //             dataResult["Key"] = querySnapshot.id
  //             _resolve(dataResult)
  //           } else {
  //             _resolve(dataResult)
  //           }
  //         },
  //         (error) => { _reject(`Èrror getting query READ: ${error}`) })
  //   })
  //   return result
  // }

  // public Update(data: T) {
  //   let docId = data["Key"]
  //   delete data["Key"]
  //   // data.BusinessTypeRef = this.db.doc(this._serviceBusinessType.dbPath.concat(String(data.BusinessTypeRef))).ref
  //   let result = this._db.collection<T>(this._dbPath).doc(docId).update(data);
	// 	return result;
  // }

  // public Delete(identifier: string) {
  //   let result = this._db.collection<T>(this._dbPath).doc(identifier).delete();
  //   return result;
  // }

  // public Filter(column, keyword = "") {
  //   return this._db.collection<T>(this._dbPath, ref => ref.where(column, '>=', keyword)).snapshotChanges()
  // }

  // protected ConvertData(data: any): T[] {
  //   let items = data.map(
  //     (i) => {
  //       let item
  //       if(i.hasOwnProperty('payload')){
  //         item = i.payload.doc.data()
  //         // console.debug(item)
  //         item.Key = i.payload.doc.id
  //       }else{
  //         item = i.data()
  //         // console.debug(item)
  //         item.Key = i.id
  //       }
  //       return item
  //     }
  //   )
  //   return items
  // }
}
