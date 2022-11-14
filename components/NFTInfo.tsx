import { Text, VStack } from '@chakra-ui/react';
import { CenteredColumn, SpaceBetweenColumn, FlexStartSpaceBetweenColumn } from "./Columns";
import { SpaceBetweenRow } from "./Rows";

interface InfoRowProps { infoLabel: string; infoValue: string };
const InfoRow = ({ infoLabel, infoValue }: InfoRowProps) => (<><Text>{infoLabel}</Text><Text>{infoValue}</Text></>)

interface MintGeneralInfoProps { price: number, liveDate: Date };
const MintGeneralInfo = ({ price, liveDate }: MintGeneralInfoProps) => {
    <FlexStartSpaceBetweenColumn>
        <VStack>
            <Text fontWeight="bold">Mint Price</Text>
            <Text>{price} SOL</Text>
        </VStack>
        <VStack>
            <Text fontWeight="bold">Live Date</Text>
            <Text>{liveDate.toString()}</Text>
        </VStack>
    </FlexStartSpaceBetweenColumn>
}

interface MintStatsProps { 
    itemsAvailable: number;
    itemsRedeemed: number;
    itemsRemaining: number;
    royalties: string;
}
const MintStats = ({ itemsAvailable, itemsRedeemed, itemsRemaining, royalties }: MintStatsProps) => {
    <CenteredColumn>
        <Text fontWeight="bold">Mint Stats</Text>
        <SpaceBetweenRow>
            <InfoRow infoLabel="Items Available" infoValue={itemsAvailable.toString()} />
        </SpaceBetweenRow>
        <SpaceBetweenRow>
            <InfoRow infoLabel="Items Redeemed" infoValue={`${itemsRedeemed}/${itemsAvailable}`} />
        </SpaceBetweenRow>
        <SpaceBetweenRow>
            <InfoRow infoLabel="Items Remaining" infoValue={`${itemsRemaining}/${itemsAvailable}`} />
        </SpaceBetweenRow>
        <SpaceBetweenRow>
            <InfoRow infoLabel="Royalties" infoValue={royalties} />
        </SpaceBetweenRow>
    </CenteredColumn>
}
interface CreatorsProps { items: [{ address: string, percentage: string }] }
const Creators = ({ items }: CreatorsProps) => {
    <CenteredColumn>
        <Text fontWeight="bold">Creators</Text>
        {
            items.map((item: { address: string, percentage: string }, idx: number) => (
                <SpaceBetweenRow key={idx}>
                    <InfoRow infoLabel={item.address} infoValue={item.percentage} />
                </SpaceBetweenRow>
            ))
        }
    </CenteredColumn>
}


interface NFTInfoProps {
    generalInfo: { price: number, liveDate: Date },
    mintStatsInfo: { 
        itemsAvailable: number;
        itemsRedeemed: number;
        itemsRemaining: number;
        royalties: string;
    },
    authors: [{ address: string, percentage: string }]
}
const NFTInfo = (props: NFTInfoProps) => {
    return (
        <SpaceBetweenRow>

        </SpaceBetweenRow>
    );
}

export default NFTInfo;