import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { useDecks } from "@/context/DeckContext";
import { ScreenView, DeckContainer, DeckTitle } from "@/ui/CardInputFields";

export default function App() {
    const router = useRouter();
    const { decks } = useDecks();
    const headerHeight = useHeaderHeight();

    return (
        <ScreenView>
            <FlatList
                data={[...decks].reverse()}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 100, gap: 4 }}
                renderItem={({ item }) => (
                    <DeckContainer onPress={() => router.push({
                        pathname: '/deck/[id]',
                        params: { id: item.id },
                    })}>
                        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                            {item.title}
                        </DeckTitle>
                    </DeckContainer>
                )}
            />
        </ScreenView>
    );
};