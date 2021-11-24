import {FlatList, Image, Platform, Text,TouchableOpacity, View,} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectTravelTimeInfo } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <View style={tailwind``}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind`absolute top-1 left-0 px-5 rounded-full`}
        >

        </TouchableOpacity>
        <Text style={tailwind`text-center mb-5 text-lg`}>
          Selecciona tipo de transporte: - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tailwind.style(
              `flex-row justify-between items-center px-6`,
              id === selected?.id && "bg-gray-200"
            )}
          >
            <Image
              style={{
                width: 200,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tailwind`-ml-8`}>
              <Text style={tailwind`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            
          </TouchableOpacity>
        )}
      />
      <View style={tailwind`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tailwind.style(
            `bg-black py-3 m-3`,
            !selected && "bg-gray-200"
          )}
        >
          <Text style={tailwind`text-center text-white text-lg`}>
            cargar con  {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type RidesData = {
  id: string;
  title: string;
  image: string;
}[];

const ridesData: RidesData = [
  {
    id: "123",
    title: "Auto",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjXIwVmSD-6Z8Y12rzWdmB1iyZlVqN8JgrBw&usqp=CAU",
  },
  {
    id: "456",
    title: "Bus",
    image: "https://static.vecteezy.com/system/resources/previews/002/623/964/non_2x/city-transport-bus-free-vector.jpg",
  },
  {
    id: "789",
    title: "Bicicleta",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAADQ0ND6+vqBgYH39/e6urrr6+vv7+/Z2dnc3Nzs7Oz19fXLy8sXFxczMzOMjIxycnKTk5O0tLS8vLysrKzl5eVZWVkdHR0mJiZTU1M7OzvExMRsbGxKSkqamppjY2N5eXmjo6NCQkKYmJgODg40NDQkJCRNTU2NjY0sLCwSEhJVVoP/AAAQWklEQVR4nO1dZ3vqOgwmq4yy9yaB0p7S////Lgk4kWx5JRSTPvf9dA5NqRTLsrYbjWci2g7jTf88WISz1lP/8JMwjT2A/TFyTdCD4f/zOKwmrml6KBKevxSbd9dkPQytE8XgFb5ryh6E5o+EQc+buqbtIQguUgY9r+2aukcgVjDoeX/g3DgoGfT2rumrjK6aQc/buqawKkIdhxvXFFaEdgk97801jdUw0XO4c01jNSz0HHq1tlBbZwMOa61rfAMGvQ/XVFZBz4TDoWsqq8BA0dRc1YxNODy5prIKjiYcLlxTWQVbEw5D11RWgZEuHbumsgrmJhzOXFNZCRsDDusdrtF4hynWrmmsho6ew4NrGitir2PwXPc4RlvHYa2t0gw7DYeu6auO1lLJYM81fQ+AUk6Prql7CN7kDCauaXsQpjIGa+0ZInRWJIN/Kb8WEWHTuOOaqsdiPsL8nf5KZg0geItZ5O00a7qm5rfw3u712vPANRn/Q4Npsr8MNqNp1zUhv4MuUJqL7R8URy4+uhz+sROB8uj3s78krZLo6O7PHH3yJMVy/DfOv4GUw1TtvNU6TZhB6kHc0Q/rXjxD+w8Iq2Od1Y425HRDWN8dqS0rYairVxipA05oGV3TWg6KYIyAb9fEloJJWUmOOhYJNW0YrGUY2CDHBFHDpKi5nslwcU2vNYyy2RC1M29Gep5w/VfdMtsGNZZXJwr+p25n4syEwyPsSRi5JtkS2kRvii94otRsDQ2S9SnaYKlrlpMZmnE4Ao0J9UqMBoaH4bkbMYV6rlcNDV28thKbnSZ5KKdmNTQSo1s05Na5QNer30l2GPpiZGreaNxW1jXNdpDVkPa+hY/Gd71bs7NCFkQ8ioWJ/cbNOqhXrF9qdIdEYWJ6SMR1K3tOZByOCGMuLVrv1qyIpittEF00IvHDNF7aq1dAUd5vsAkIp6puXtMVaymHP10iV1OzLdhQF3K3GoGoZ+ulRhvqlpE59eOaORWNhoLBtCdNXOJlzXL7yo6RVKuIvnHNevGUnehpfbOoamPHJNvhXcXgbcuJH9cqF6xu3IrTRxLh41pZNOoIVNaHLpqtn66ptoAuApU99Cl8XKN4ty7tmz0kuvpf4aQuYRoNg7eWLdrq+RkdO69ftaBtn7zVQklzpz+LYW/umAc11GNZPBZvUue/B6PJy5qq+nTM3VXSPuctDr1XNOb0nej3TK9ZHcq/cPpq5dH62oR7o71hLdEVm3j2QiLb1Vd5sflBypI+gcuXqdU0aGL+uj9q1JVf4FVcSIOU2vn+qNpAf1kWTYZ6MNNF12XJ4zVybyZDPZgFaphCzfEas6NMNle+FkYTQABewtTRlQSnKJJoiR2HLxFWNZE8kGMymlSTg/Xod126yyYjL9BAvbfFlzWHLc87OjN0uibZe85C6byNjApT8jriK4de31lxuNa18MjCoPfeWG/vsdzNbSssHa2j0c6SnGztmfKIXPN/4+xkeIaZpSKfejGfhifJOLdcuJPiMxc6R552Argoj7am/xGL+7k4K+Cni+cHWs28orOuqDuazxLEZdGugOMk8W8yQ8NE11yxmerffnc6vlcY7cCic4UAzw9DGk2ByrAY+/oxNJG/3frwZfARHgddDFY+w3po6dsKJ66DwW5GYxEBLlaHt3Bsxr/EhgqGOxGug3H7cyL87lPt8eBttNjv9ybDyngsh0YaI2PwiNbxmdYbUZVng7WWx/cba4dGrzBkn9n0ZjQOUQmNFcaqqdJMXO/0fAaNmg80UESbmsciUJktth8u4uNTh54ZN1OqIDd14FOOGqRMxh/rITV0YK2Ym5iUZSeeDNKtiHa5kyi/bWxQAmmJW9AHTznpNyWKKktB6lcl4KHlMznLUeacJyAVQGQMOqlrMAmVluQwCKIoasKgnJskhlVbsxRTfzudzI6H8TAMk9FoFy/W+83gssSq2o2YRsLtTb8IR+U3linBKnCWa/O3bzmmv8nw52tk96v5Gmq8RpWYUZ9sSbxGSti6Xd0CX/o///swbbIsh1cQ0+Q3GXwFMa3u86vhmr9Gt68nshKcFxEZzIyoBtcdmWUM8dUoHH6Px4fDcTZ52/b89ryrCKCv3DJIxKX28S4Jv6/UzyaTLZnXFuMvieqFPEFMg+Z83t6+bdvzeZMLsBCOBqSfvuBROAAESe/BxsarmEZXCvw7BY+24zqTcAGd3sEimRUvlbJmfsBLIG2BC0+jwOAWTWpYjRbQLtwswodVFkeTHX2YL+NbwT0dlgLRW3KkBF/BIOzBnj4Bu9xNKmeFg60687KeRg3aUwSFNGTIg2vvEgQ9ExHV/aV3xJXG3LbG+mPuR/YK8n1GZ1ExXTSDZsVw/XHZYHhrWCLuWyxoLoak54jHYkgYbBmm7s7DUjxaTie7YVxEUnMxJaUYJQKFko6O/NVIYF9t0zPYAiJOoMmJ/c2AfBK2qwsjUDIGt3YUXOxqboPEkrWCtAn4dwbS3gHJiIC3B87pb3btc8uJhcqZl4xIpC2jbMROHlshTdYiUi8wmL2atsGwVwED46pbu0LQArey9fvpl5vK5GGaK9pIaN1L5bdsRMQwhSqOXDFFpj7vuoZtC9qgYQd1xG+2ZboOSWkKjLI40uTneZ2Ew/F3GC6kIpQVnmWq/8x4IN9XfpLwSiZjUFott1zvrhQMw2QtPccMvCx6hw/GvQhs5KB3oOtgT8Hd3c9Le8jnWPU3b5b9vKsY9Po5CUHUG9PKIi7D4IbMoAfkYqdKMjWE2I6gDRr2fR/441VLySBv6rWOlD2oYZG6DEbimUmCa+ubrcB4IHVGbgxgbj7fJa84h1Bw7BOPKwVVtAMXUhdFFrhIUod4wJ4iCWalsLgCd9AivxXpIpGMjuicKmobhF7PvnzAgzxwcbySqTZo2LmFjqVMvwpL3vdRRp2iZyu4B9IiD2HPKMZTtqSDha5mc1tt0OT5QOgTnlIGhfqAVOLgZqMvDhYWXnb08/tWVSan2i79aMGUXkL9PA/vgs/2WcUarx6zJYNb50x7vPzSSypUeFdcFUnH8rzkKBvlupd8A0x1gWR9toKCnrtJAjpSJNuGP3bIGDknIX3VsKoWR3IgKVYmDZr8VCsYuilXTqRPrBAR5vRl91s3uc1IKUisuZfKaVxYf103SxcZJ322hqSPnu/ufCvfhRpLwiavtISnZl9Wf9nEhxcxeJIzt5VxLCz2mRJEtzjmBo04/NIrNF0uNHcG8beei1eMNKB0oiQng6IRjldZGX/ldK4vfDijH7yDkc5cePa68VNQHcI9INfveEv0+R/jF6juTsErwzY1yD4x6kiDJpefu8Ua3/+LJRppFBRQkccPcdSDPwmQFMfEr8u+KLdeCsWRj1tXGjT3MCtTHVh54ZstzcSU+3tcFQ7W/srJKpzoFWdKwHQes5ro6jf2C2/4ZaIlXHILBaUmbkiBrUBs2SDBUxfEYxmFMS52vjEeyKxp/mpHiFzsCvNRJSSminAM2hao8rEj/YkA7PCgFlF2iLD/ku4V27ZRqtoKtYHOwn/8H0X0qbqo0OuH5wESEeU4NU4nz4kf5mRTDKLoBthtaAuJ1hTUprGCPCQ2wMdAww3VuUgcV+F17g5+SOdV2KPfiEHkgxAsQDFVXuMNAyyDQp7RwiiHNGPBEwwHH64AeVbkC7xEniqyNwiDGOW3VGKKVGYhpugNqfJVnJ0pOinpPmAnekJxOEmDPMNdMsZhMW3pOgw6xgoKIxijKtQg3ASqO5a5UZ2Ezk3PSnbWkCZb9P4xIH4bPkK66OgQVvUGwfcak9+vstewjMbEE6m8s21ChYkG4GXO8K/lIE1iJKaqwC8SM+rDpeL9cJ14pDh/FlKqbU0sNAY8KyQD+aDrEys4RC2LbLngNle0MAbYOKc1UlisgTY9V2wTeFpJtgkSU5WugJ4dW2x4iCtsbhwNkRCyLb5W25QRK6nigIxFlZjCV/FBfL88C8d54ElIYgTilbpe9uKwgVtW5pn+I39TBNxLTCJXBt/faBmnvHOTQVdxmgdTIhinkBGAxFRx6EPRYaScDb7fphs2V8eaNDVZyyB4rtRDSjEFj7ExVWfxIwE2lWv5Fu0qM61x/uXwtctb1aAoq3q6RXagGyc1SsnjW4abrdNVFywCItv0xxyQFagIlMFNd1O60G+UvUHzXZgi89ubiqj49Q9BkwZyKLepUBRAYZjAtb69CCjge8lvmc9OyHA9KwPVqo8wgZBDRb0z1KYKFw9mLOfCuxnIfs2yBrip2LirI39gQw4VuRIopopoJ9z8N50LfTNpE5XlRLmLNFlOXWANNU0sJx0shVDZCADNtvtjJqeFpZh6e/K43xxJDWGyT1IUNQGqUBL4MnY0QJUgNbxt7lGVQHr/eNPoRG4Uh7LKxYMFyz/3z6DykeuojtFAISkuwu4rgIqIVRw2jqn1M1BO9IGWFDsa4LmlCkM1fT0ktT4jddUZVH+a9piOrykNhsEopragcVW1OYWqpxocdcO74TuuOhoCpkGZpwQVe9U7UkSdK6vlgIDvOK5IATyHmQ+LIgQVb/GB52bPPxwNBkQ1sGRJTW8z0MxAVVZNSFCgw7waEoVLq3VWwG1S+BEJ+LTaJCZ4ztvcgADVebUGIOjOF4cKUg9VxBSFgWyGksBAiioYpoUkJoc+rjKGQhe6lsKnCbMHKoUEi4UqDyr0L0Bhs+tshYsvNf/1QBsabjj07ssPmUT+hN3Jiop5yl8mhCKYUBawg1t6WhH6FrvWXWTZlz4wkJOMc1TooC572zLKQtrepIq6MspOTkJxE1xchHN95caF4wiw7U2q2HcpN+sapx04IUKOw08pfY3qne076FHutZTxiC9i5IUIL2KZy3qxU2+v8fEiljn2sXsn6AFcqma/EbhKsBIE4sI0+wmJuORItM24PIrtH+AqS8ro+4pfwXmmhBfJlZfaiRmXWowtqbuB87zs9B3nmFKnMV97bzN5mQ/ilLNt+XZbG3XMpUjoOxb5EibzvciHLspOGeUzOebfwxeySkScD3GuDduI+fxE+WvT+QSXoe0R8UEyqSYWOnhMtoLPd0FVuIVT6FJZmdh+wqRfecxVDPvudMZFV2xFrzJLRqyjCnXWx1wMDSmIJrK26ibig5hgqhYGEQPP/YNKJlpEs78yDEKNdg5lr+SdKlSvOvyeCriOZbp5TmVHNFuL7B89HcXbwpozcuxe9XmqZH3/eiIwGcyPZAJPK0OSFtnPZOZ3Whmf3bn/lkiu4XjEwNgP+qtPycSfd1MKglbHnyXizZhmDCpnkPe/Lp+DlWLk1WPuZ1B0AacUXL4UyUwjQ8j8Gjgetj6hDOWHThnq8fdyWabPx43D7ZSbj7o2v9zU9vqpFLtHXq8RlBk8ZaUEetbz5R4loQzWQwGWtrEXu2UcPf5+lMhuZngJLT43r/PSD8kvhbb5FNi4XOiqY1aAcfq9m/x8s2G+u/I6jrSKMEa/O1C8rX/LUqvSEMpBUYvZ70/z705Uh1dcPgNQ4L0XUjbaJhRtxV9CcxtSB+Q+7D3udu+oPTmO9pvVj3deXk67w8x/9l1vXX9y2O0/v368n9VmPzpO2obq+z8bi9GNw3Z0iAAAAABJRU5ErkJggg==",
  },
];

//const SURGE_CHARGE_RATE = 1.5;

export default RideOptionsCard;
