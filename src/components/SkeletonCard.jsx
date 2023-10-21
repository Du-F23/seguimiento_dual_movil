import {Skeleton} from "moti/skeleton";
import {Dimensions, View} from "react-native";

export function SkeletonCard({heigth, color}) {
    return(
        <View style={{
            margin: 10
        }}
        >
            <Skeleton height={heigth} width={Dimensions.get('screen').width - 20} radius={10} colorMode={color} type={"skeleton"}/>
        </View>
    );
}