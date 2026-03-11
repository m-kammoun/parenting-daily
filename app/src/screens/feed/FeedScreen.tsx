import React, { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { View, FlatList, Dimensions, StyleSheet, ViewToken, StatusBar } from "react-native";
import { Fact, getShuffledFacts } from "@assets/data/facts";
import FactCard from "@/components/feed/FactCard";
import WelcomeCard from "@/components/feed/WelcomeCard";
import { useWelcomeSeen } from "@/hooks/useWelcomeSeen";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const WELCOME_ITEM_ID = "__welcome__";

interface WelcomeItem {
  id: typeof WELCOME_ITEM_ID;
}

type FeedItem = WelcomeItem | Fact;

const FACTS = getShuffledFacts();

export default function FeedScreen() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { isWelcomeSeen, markWelcomeSeen } = useWelcomeSeen();

  // Mark welcome as seen once the user scrolls past it (index > 0)
  useEffect(() => {
    if (visibleIndex > 0 && !isWelcomeSeen) {
      markWelcomeSeen();
    }
  }, [visibleIndex, isWelcomeSeen, markWelcomeSeen]);

  // Prepend welcome card only on first launch
  const data = useMemo<FeedItem[]>(() => {
    if (isWelcomeSeen === null) return []; // still loading
    if (isWelcomeSeen) return FACTS;
    return [{ id: WELCOME_ITEM_ID }, ...FACTS];
  }, [isWelcomeSeen]);

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
    ({ item, index }: { item: FeedItem; index: number }) => {
      if (item.id === WELCOME_ITEM_ID) {
        return <WelcomeCard isVisible={index === visibleIndex} />;
      }
      const fact = item as Fact;
      return (
        <FactCard
          item={fact}
          isVisible={index === visibleIndex}
          onInfo={() => {
            handleInfo(fact);
          }}
        />
      );
    },
    [visibleIndex, handleInfo]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  if (isWelcomeSeen === null) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <FlatList
        data={data}
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
