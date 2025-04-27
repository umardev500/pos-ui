import {Route, SceneRendererProps} from 'react-native-tab-view';

export type RenderScene = (props: SceneRendererProps & {route: Route}) => React.ReactNode;
