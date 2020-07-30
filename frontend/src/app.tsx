import React,{FC,useState} from 'react';
import { Upload,message, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './styles.css';

type Color = "#ffffff" | "#11d560" | "#ff4d4f";

const App : FC<{}> = ()=>{
    const [color,setBackgroundColor] = useState('#ffffff' as Color);

    const showNotification = (info : any) => {
        if (info.file.status === 'done') {
            setBackgroundColor('#11d560');
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            setBackgroundColor('#ff4d4f');
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const disableNotification = () =>{
        if(color !== '#ffffff') {
            setBackgroundColor("#ffffff");
        }
    }
    return (
        <div className="wrapper" style={{background : color}} onTransitionEnd={disableNotification}>
            <div className="content">
                <Upload method="POST" action="/upload" onChange={showNotification}>
                    <Button>
                        <UploadOutlined /> Upload
                    </Button>

                </Upload>
            </div>
        </div>
    )
}


export default App;