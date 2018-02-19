$(function() {
   
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str +=chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    var columnCount = 0;

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<div>').append($('<h2>').addClass('column-title').text(self.name));
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            $columnDelete.click(function() {
                self.removeColumn();
                columnCount--;
            });

            $columnAddCard.click(function() {
                var name = prompt('Enter the name of the card');
                if (name === null || name === "" ) {
                    return;
                }
                self.addCard(new Card(name));
            });

            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);
            
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    }

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.cardColor = cardColor();
        this.$element = createCard();

        function cardColor() {
            var possibleColors = ['#ffc','#C5F0A4','#FAE3D9'];
            return possibleColors[Math.floor(Math.random()*3)];
        }
        
        function createCard() {
            var $card = $('<li>').addClass('card').css('background-color', self.cardColor);
            var $cardDescription = $('<div>').append($('<p>').addClass('card-description').text(self.description));
            var $cardDelete = $('<div>').append($('<button>').addClass('btn-delete').text('x'));
            
            $cardDelete.click(function() {
                self.removeCard();
            });

            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    }

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            scroll: false,
            cursorAt: {left: 5},
            start: function (event, ui) {
               ui.placeholder.height(ui.item.height());
           }
        }).disableSelection();
    }

    $('.create-column').click(function() {
        var name = prompt('Enter a column name');
        if (name === null || name == "") {
            return; 
        }
        if (columnCount >= 5) {
            alert("The maximum number of columns is 5");
            return;
        }
        if (name.length > 25) {
            alert("The name of the board shouldn't be longer than 25 characters");
            return;
        }
        var column = new Column(name);
            board.addColumn(column);
            columnCount++;
    })

    var toDoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    board.addColumn(toDoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    columnCount = 3;

    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    toDoColumn.addCard(card1);
    doingColumn.addCard(card2);
})
