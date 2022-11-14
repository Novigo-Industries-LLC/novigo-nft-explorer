import { VStack } from '@chakra-ui/react';

export const CenteredColumn = (props: React.PropsWithChildren<any>) => (<VStack alignItems="center" justifyContent="center" {...props}>{props.children}</VStack>);

export const SpaceBetweenColumn = (props: React.PropsWithChildren<any>) => (<VStack alignItems="center" justifyContent="space-between" {...props}>{props.children}</VStack>);

export const FlexStartSpaceBetweenColumn = (props: React.PropsWithChildren<any>) => (<VStack alignItems="flex-start" justifyContent="space-between" {...props}>{props.children}</VStack>);