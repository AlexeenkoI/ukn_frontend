import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon} from 'antd'
import Preloader from '../Preloader';
import { Link } from 'react-router-dom'

class FileUploader extends Component {

    download = (link) =>{
      fetch(link, {method : "GET"})
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        window.open(url, '_blank');
        //setTimeout(function(){
        //  // For Firefox it is necessary to delay revoking the ObjectURL
        //  window.URL.revokeObjectURL(url);
        //}, 100)
        URL.revokeObjectURL(url);
        //return false;
    });
    //return false
    }

    preview = (file) =>{
      console.log('link clicked');
      console.log(file);
      this.download(file.url)
      //return false;
    }

    render() {
      const fl =  [{
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      }, {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      }, {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      }]
      const { actionUrl, callbackUploader,callbackRemover, files, contractId, loading } = this.props;
        if(loading) return <Preloader/>
        return (
          <div>
            <Upload 
              action={actionUrl}
              multiple={true} 
              data={{upload_contract: contractId}}
              headers={{
                Authorization : `Bearer ${localStorage.getItem('app_token')}`,
              }}
              defaultFileList={files}
              onChange={callbackUploader}
              onRemove={callbackRemover}

              openFileDialogOnClick={false}
              //onPreview={this.preview}
              //customRequest={this.ownRequest}
            >  
                <Button>
                    <Icon type="upload" /> Загрузить
                </Button>
            </Upload>
            { /*files.map( file => 
              <a href={file.url} onClick={() => this.download(file.url)} download>{file.name}</a>
            ) */}
          </div>
        );
    }
}

FileUploader.propTypes  = {
    actionUrl : PropTypes.string.isRequired,
    callbackUploader : PropTypes.func.isRequired,
    callbackRemover : PropTypes.func.isRequired,
    contractId : PropTypes.number,
    files : PropTypes.array,
    loading : PropTypes.bool
};

export default FileUploader;