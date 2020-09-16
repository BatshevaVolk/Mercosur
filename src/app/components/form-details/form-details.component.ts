import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent  {
  private data: any[] = this.getBasicData(10);
  private colHeaders: string[] = ['ID', 'First Name', 'Last Name', 'Address',
    'Favorite food', 'Price', 'Is active'];
  private columns: any[] = [
    {
      data: 'id'
    },
    {
      data: 'name.first',
      renderer: 'text',
      readOnly: true
    },
    {
      data: 'name.last',
      readOnly: true
    },
    {
      data: 'address'
    },
    {
      data: 'product.description',
      renderer: 'text'
    },
    {
      data: 'price',
      type: 'numeric',
      numericFormat: { pattern: '$0,0.00', culture: 'en-US' }
    },
    {
      data: 'isActive',
      type: 'checkbox',
      checkedTemplate: 'Yes',
      uncheckedTemplate: 'No'
    }
  ];
  private colWidths: number[] = [null, null, null, null, null, null, 30];
  private options: any = {
    stretchH: 'all',
    columnSorting: true,
    contextMenu: [
      'row_above', 'row_below', 'remove_row'
    ]
  };

  private afterChange(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  private afterOnCellMouseDown(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
   getBasicData(rows = 10): any[] {
    const products: any[] = [
        {
          description: 'Big Mac',
          options: [
            {description: 'Big Mac'},
            {description: 'Big Mac & Co'},
            {description: 'McRoyal'},
            {description: 'Hamburger'},
            {description: 'Cheeseburger'},
            {description: 'Double Cheeseburger'}
          ]
        },
        {
          description: 'Fried Potatoes',
          options: [
            {description: 'Fried Potatoes'},
            {description: 'Fried Onions'}
          ]
        }
      ];
    const firstNames = ['Ted', 'John', 'Macy', 'Rob', 'Gwen', 'Fiona', 'Mario',
        'Ben', 'Kate', 'Kevin', 'Thomas', 'Frank'];
    const lastNames = ['Tired', 'Johnson', 'Moore', 'Rocket', 'Goodman', 'Farewell',
        'Manson', 'Bentley', 'Kowalski', 'Schmidt', 'Tucker', 'Fancy'];
    const address = ['Turkey', 'Japan', 'Michigan', 'Russia', 'Greece', 'France', 'USA',
        'Germany', 'Sweden', 'Denmark', 'Poland', 'Belgium'];
  
    const items: any[] = [];
    let product: any;
    let newProduct;
  
    for (let i = 0; i < rows; i++) {
      // clone expected product
      product = products[Math.floor(Math.random() * products.length)];
      newProduct = {
        description: product.description,
        options: []
      };
      product.options.forEach(p => {
        newProduct.options.push({description: p.description});
      });
      /// clone expected product
  
      items.push({
        id: i + 1,
        name: {
          first: firstNames[Math.floor(Math.random() * firstNames.length)],
          last: lastNames[Math.floor(Math.random() * lastNames.length)]
        },
        date: `${Math.max(Math.round(Math.random() * 12), 1)} / ${Math.max(Math.round(Math.random() * 28), 1)} /
        ${(Math.round(Math.random() * 80) + 1940)}`,
        address: `${Math.floor(Math.random() * 100000)} ${address[Math.floor(Math.random() * address.length)]}`,
        price: Math.floor(Math.random() * 100000) / 100,
        isActive: Math.floor(Math.random() * products.length) / 2 === 0 ? 'Yes' : 'No',
        product: newProduct
      });
    }
  
    return items;
  }
}
