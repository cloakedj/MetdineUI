import { DefaultUrlSerializer, Params, UrlTree } from '@angular/router';
import { createDecipheriv, createCipheriv } from 'crypto';
export class EncodeUrl extends DefaultUrlSerializer{
  queryParamObj: Params;
  serialize(tree: UrlTree): string {
    this.queryParamObj = tree.queryParams;
    return super.serialize(tree);
  }
  parse(url: string): UrlTree{
    for (const param in this.queryParamObj) {
      console.log(this.encodeWithCrypto(this.queryParamObj[param]))
    }
    return super.parse(url);
  }
  encodeWithCrypto(param : string): string {
    const cipher = createCipheriv('aes192', 'MetDine', "DhananjayKanwar");
    return cipher.update(param, 'utf8', 'hex') + cipher.final('hex');
  }
}
