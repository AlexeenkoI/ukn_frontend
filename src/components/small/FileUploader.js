import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon} from 'antd'

class FileUploader extends Component {

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
      const { actionUrl, callbackUploader,callbackRemover, files, contractId } = this.props;
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
                  //customRequest={this.ownRequest}
                >  
                    <Button>
                        <Icon type="upload" /> Загрузить
                    </Button>
                </Upload>
            </div>
        );
    }
}

FileUploader.propTypes  = {
    actionUrl : PropTypes.string.isRequired,
    callbackUploader : PropTypes.func.isRequired,
    callbackRemover : PropTypes.func.isRequired,
    contractId : PropTypes.number,
    files : PropTypes.array
};

export default FileUploader;