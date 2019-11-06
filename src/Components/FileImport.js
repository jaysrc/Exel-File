import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import XLSX from 'xlsx';
import { SheetJSFT } from './types';
import { make_cols } from './MakeColumns'
import { Tabs, Tab } from 'react-tab-view'

export default class FileImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      btnDisabled:false
    }

  }

  onChange = (e) => {
    const files = e.target.files; //console.log(files)
    if (files && files[0]) this.setState({ file: files[0] });
  };

  onSubmit = () => {
    this.setState({btnDisabled:true});
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {

      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
     
      const data = XLSX.utils.sheet_to_json(ws);


      // console.log(data)
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        //console.log(JSON.stringify(this.state.data, null, 2));
        this.setState({btnDisabled:false});
        alert('Your file has been uploaded');
      })
      
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  render() {
    const headers = ['Upload', 'View']
    const headers2 = ['Table View', 'JSON View']
    return (
      <div>
        <Tabs headers={headers} className='nav nav-tabs' style={"{{border:'2px solid green'}}"}>
          <Tab>
            <div className="container">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">
                    <label>Upload Your File </label>
                    <input type="file" className="form-control" accept={SheetJSFT} value={this.state.selectedfiles} onChange={this.onChange} />
                  </div>
                  <div className="form-group">

                  </div>

                  <button type="button" className="btn btn-success btn-block" onClick={this.onSubmit} disabled={this.state.btnDisabled}>Upload</button>

                </div>
              </div>
            </div>
          </Tab>
          <Tab>
          <Tabs headers={headers2}>
            <Tab>
              <div>
                <h1>View</h1>
                <table className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Segment</th>
                      <th>Country</th>
                      <th>Product</th>
                      <th>Discount_Band</th>
                      <th>Units_Sold</th>
                      <th>Manufacturing_Price</th>
                      <th>Sale_Price</th>
                      <th>Gross_Sales</th>
                      <th>Discounts</th>
                      <th>Sales</th>
                      <th>COGS</th>
                      <th>Profit</th>
                      <th>Date</th>
                      <th>Month_Number</th>
                      <th>Year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      this.state.data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item['Segment']}</td>
                            <td>{item['Country']}</td>
                            <td>{item[' Product ']}</td>
                            <td>{item[' Discount Band ']}</td>
                            <td>{item[' Units Sold ']}</td>
                            <td>{item[' Manufacturing Price ']}</td>
                            <td>{item[' Sale Price ']}</td>
                            <td>{item[' Gross Sales ']}</td>
                            <td>{item[' Discounts ']}</td>
                            <td>{item['  Sales ']}</td>
                            <td>{item[' COGS ']}</td>
                            <td>{item[' Profit ']}</td>
                            <td>{item['Date']}</td>
                            <td>{item['Month Number']}</td>
                            <td>{item['Year']}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab>
              <div>
                <pre>
                  {JSON.stringify(this.state.data, null, 2)}
                </pre>
              </div>

            </Tab>

          </Tabs>

</Tab>
        </Tabs>
      </div>

    )
  }
}

