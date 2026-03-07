import React, { useRef, useCallback, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet, ViewToken, StatusBar } from "react-native";
import { Fact, getShuffledFacts } from "@assets/data/facts";
import FactCard from "@/components/feed/FactCard";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const INITIAL_FACTS = getShuffledFacts();

export default function FeedScreen() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const handleInfo = useCallback((item: Fact) => {
    console.log("Info pressed for:", item.id);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Fact; index: number }) => (
      <FactCard
        item={item}
        isVisible={index === visibleIndex}
        onInfo={() => {
          handleInfo(item);
        }}
      />
    ),
    [visibleIndex, handleInfo]
  );

  const keyExtractor = useCallback((item: Fact) => item.id, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <FlatList
        data={INITIAL_FACTS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        disableIntervalMomentum
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        decelerationRate={0.9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
