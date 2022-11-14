import { HStack } from '@chakra-ui/react';

export const CenteredRow = (props: React.PropsWithChildren<any>) => (<HStack alignItems="center" justifyContent="center" {...props}>{props.children}</HStack>);

export const SpaceBetweenRow = (props: React.PropsWithChildren<any>) => (<HStack alignItems="center" justifyContent="space-between" {...props}>{props.children}</HStack>);

