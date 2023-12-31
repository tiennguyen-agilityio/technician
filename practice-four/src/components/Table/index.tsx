import { memo } from 'react';
import { Heading, Text, Flex, Box, Button, Checkbox } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

// Types
import { TableData, TableHeader } from '@/interfaces';

// Assets
import { FilterIcon } from '@/assets/icons';

interface TableProps {
  title: string;
  columns: TableHeader[];
  data: TableData[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const Table = ({ title, columns, data, onAdd, onEdit, onDelete }: TableProps) => (
  <Box p='7' borderWidth='1px' borderRadius='md' borderColor='primary'>
    <Flex justifyContent='space-between' mb='7' alignItems='center'>
      <Heading variant='headingLg'>{title}</Heading>
      <Button as={Flex} gap='4' variant='outline' ml='auto' mr='0'>
        Filter <FilterIcon />
      </Button>
      {onAdd && (
        <Button ml='4' onClick={onAdd}>
          Add new{' '}
        </Button>
      )}
    </Flex>
    <Flex gap='1' flexDirection='column'>
      <Flex bg='background.section.primary' borderRadius='md' h='50px' w='100%'>
        <Box w='50px'></Box>
        <Flex w='100%' role='list'>
          {columns.map(({ key, label, width, onSort }) => (
            <Flex key={key} alignItems='center' gap='5' w={width}>
              <Text variant='textSm'>{label}</Text>
              {onSort ? (
                <Flex flexDirection='column'>
                  <TriangleUpIcon w='4' h='2' />
                  <TriangleDownIcon w='4' h='2' />
                </Flex>
              ) : null}
            </Flex>
          ))}
        </Flex>
      </Flex>
      {data?.map((item) => (
        <Flex
          key={item.id}
          h='50px'
          borderWidth='1px'
          borderRadius='md'
          borderColor='secondary'
          alignItems='center'
        >
          <Box w='50px' textAlign='center'>
            <Checkbox size='lg' isDisabled />
          </Box>
          <Flex w='100%'>
            {columns.map(({ key, width, isAction, customView }) => (
              <Flex w={width} key={key} alignItems='center'>
                {customView ? (
                  customView(item[key])
                ) : isAction ? (
                  <>
                    {onEdit && (
                      <Button px='2' onClick={() => onEdit(item.id)}>
                        Edit{' '}
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant='outline' ml='4' px='2' onClick={() => onDelete(item.id)}>
                        Delete
                      </Button>
                    )}
                  </>
                ) : (
                  <Text variant='textSm'>{item[key]}</Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  </Box>
);

export default memo(Table);
