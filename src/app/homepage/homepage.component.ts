import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    { headerName: 'State Province', field: 'state-province', sortable: true, filter: true, checkboxSelection: true ,cellStyle: {color: 'White', 'background-color': 'black'}},
    { headerName: 'Name', field: 'name', sortable: true, filter: true, cellStyle: {color: 'White', 'background-color': 'black'} },
    { headerName: 'Country', field: 'country', sortable: true, filter: true ,cellStyle: {color: 'White', 'background-color': 'black'}}
    
  ];

// Will used below code in case of highlight require of data
  // cellStyle: function(params) {
  //   if (params.value=='Punjab') {
  //       //mark punjab cells as red
  //       return {color: 'red', backgroundColor: 'green'};
  //   } else {
  //       return null;
  //   }}


  private gridsApi;

  testrow: any;
  rowData: any;
  gridOptions: any;
  count: any;


  constructor(private webas: ApiserviceService) {

  }

  ngOnInit(): void {

  }

  //For displaying university present at India

  onGridReady(params) {
    this.gridsApi = params.api;


    this.webas.fetchDataGet("search?country=India").subscribe((data: any) => {
      this.testrow = data;
      params.api.setRowData(data);
    })

  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data);
    // const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

    // console.log (`Selected nodes: ${selectedDataStringPresentation}`);
    console.log(`Selected Nodes: ${JSON.stringify(selectedData)}`);
    console.log("Selected Rows:", this.agGrid.api.getSelectedRows().length);
    this.count = this.agGrid.api.getSelectedRows().length;

  }

}








