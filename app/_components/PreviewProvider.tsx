import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import * as React from "react";
import { DeployContext } from "./Context";
export default function SandBoxPreviewProvider(){
    const previewRef: any = React.useRef(null)
    const {deploy,setDeploy} = React.useContext(DeployContext);
    const {sandpack} = useSandpack();
    const getSandPackClient = async() => {
        const client = previewRef.current?.getClient();
        if(client){
          const res = await client.getCodeSandboxURL();
          setDeploy('https://'+res?.sandboxId+'.csb.app/');
        }
    }
    React.useEffect(()=>{
        getSandPackClient();
    },[sandpack]);
    return(
        <SandpackPreview
            ref={previewRef}
            style={{ height: "80vh" }}
            showNavigator={true}
        />
    )
}